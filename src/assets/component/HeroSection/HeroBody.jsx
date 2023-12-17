import HeroText from "./HeroText"
import HeroBackground from "./HeroBackground"
import TopBar from "./TopBar"

export default function HeroBody() {
    return(
        <div className="w-full h-full items-center overflow-hidden flex justify-center">
            <TopBar />
            <HeroBackground />
            <HeroText />
        </div>
    )
}