"use client";
import TypewriterEffect from "./TypewriterEffect";

interface InfoSectionProps {
    title: string;
    content: string;
    useTypewriter?: boolean;
}

export default function InfoSection({
    title,
    content,
    useTypewriter = false,
}: InfoSectionProps) {
    return (
        <section className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-3xl">
                <h2 className="text-4xl font-bold mb-4">
                    {useTypewriter ? <TypewriterEffect text={title} /> : title}
                </h2>
                <p className="text-xl">
                    {useTypewriter ? (
                        <TypewriterEffect text={content} speed={30} />
                    ) : (
                        content
                    )}
                </p>
            </div>
        </section>
    );
}
