"use client";

import { useEffect, useState } from "react";
import ThreeScene from "../app/components/ThreeScene";
import InfoSection from "../app/components/InfoSection";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent default space bar behavior (page scroll)
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="relative">
      <div className="fixed inset-0 z-0">
        <ThreeScene scrollY={scrollY} />
      </div>
      <div className="relative z-10 pointer-events-none">
        <InfoSection
          title="Hi, My Name is Sunghwa"
          content="저는 웹 개발자이며, 창의적이고 인터랙티브한 웹 경험을 만드는 것을 좋아합니다."
          useTypewriter={true}
        />
        <InfoSection
          title="내 기술 스택"
          content="React, Next.js, Three.js, TypeScript, Tailwind CSS 등을 사용하여 현대적이고 반응형인 웹 애플리케이션을 개발합니다."
        />
        <InfoSection
          title="프로젝트"
          content="여기에 당신의 주요 프로젝트들을 나열하고 간단히 설명해주세요."
        />
        <InfoSection
          title="연락처"
          content="이메일: your.email@example.com | GitHub: github.com/yourusername | LinkedIn: linkedin.com/in/yourusername"
        />
      </div>
    </main>
  );
}
