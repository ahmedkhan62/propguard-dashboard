import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import VisitorSurveyPopup from "@/components/shared/VisitorSurveyPopup";
import { AnnouncementBar } from "./AnnouncementBar";
import { ParticleBackground } from "./ParticleBackground";

interface PublicLayoutProps {
    children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div className="relative min-h-screen overflow-hidden transition-colors duration-500">
            <ParticleBackground />
            <AnnouncementBar />
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
            <VisitorSurveyPopup />
            <Footer />
        </div>
    );
};
