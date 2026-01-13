"use client";

import { useEffect, useRef, useState } from "react";
import { Application, Graphics, Container, Sprite, Texture } from "pixi.js";
import { createNoise3D } from "simplex-noise";

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
    setMounted(true);

    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Skip PixiJS entirely on mobile for performance
    if (!mounted || !containerRef.current || isMobile) return;

    let app: Application | null = null;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const SCALE = 200;
    const LENGTH = 5;
    const SPACING = 20; // Increased spacing = fewer particles = better performance

    const noise3d = createNoise3D();

    const existingPoints = new Set<string>();
    const points: { x: number; y: number; opacity: number; sprite: Sprite }[] =
      [];

    function getForceOnPoint(x: number, y: number, z: number) {
      return (noise3d(x / SCALE, y / SCALE, z) - 0.5) * 2 * Math.PI;
    }

    function getDotColor(): number {
      // Use a dark gray in dark mode (preserves existing behavior)
      // and a lighter gray in light mode for better contrast if shown.
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ) {
        return 0x333333;
      }
      return 0xcccccc;
    }

    function createDotTexture(application: Application): Texture {
      const g = new Graphics().circle(0, 0, 1).fill(getDotColor());
      return application.renderer.generateTexture({ target: g });
    }

    function addPoints(dotTexture: Texture, particleContainer: Container) {
      for (let x = -SPACING / 2; x < w + SPACING; x += SPACING) {
        for (let y = -SPACING / 2; y < h + SPACING; y += SPACING) {
          const id = `${x}-${y}`;
          if (existingPoints.has(id)) continue;
          existingPoints.add(id);

          const sprite = new Sprite(dotTexture);
          sprite.anchor.set(0.5);
          particleContainer.addChild(sprite);

          const opacity = Math.random() * 0.5 + 0.5;
          points.push({ x, y, opacity, sprite });
        }
      }
    }

    let particleContainer: Container;
    let dotTexture: Texture;

    const handleResize = () => {
      if (!app) return;
      w = window.innerWidth;
      h = window.innerHeight;
      app.renderer.resize(w, h);
      if (dotTexture && particleContainer) {
        addPoints(dotTexture, particleContainer);
      }
    };

    const setup = async () => {
      app = new Application();
      await app.init({
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        width: w,
        height: h,
      });

      if (!containerRef.current) {
        app.destroy();
        return;
      }

      containerRef.current.appendChild(app.canvas);

      particleContainer = new Container();
      app.stage.addChild(particleContainer);

      dotTexture = createDotTexture(app);
      addPoints(dotTexture, particleContainer);

      app.ticker.add(() => {
        const t = Date.now() / 10000;

        for (const p of points) {
          const { x, y, opacity, sprite } = p;
          const rad = getForceOnPoint(x, y, t);
          const len = (noise3d(x / SCALE, y / SCALE, t * 2) + 0.5) * LENGTH;
          const nx = x + Math.cos(rad) * len;
          const ny = y + Math.sin(rad) * len;

          sprite.x = nx;
          sprite.y = ny;
          sprite.alpha = (Math.abs(Math.cos(rad)) * 0.8 + 0.2) * opacity;
        }
      });

      window.addEventListener("resize", handleResize);
    };

    setup();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (app) {
        try {
          app.destroy(true, {
            children: true,
            texture: true,
            textureSource: true,
          });
        } catch (error) {
          console.error("Error destroying pixi app:", error);
        }
      }
    };
  }, [mounted, isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10  dark:opacity-100 opacity-20"
    />
  );
};

export default Background;
