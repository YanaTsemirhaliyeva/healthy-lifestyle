import { FortuneWheelComponent } from "~/components/fortune-wheel/FortuneWheel";
import { HelmetComponent } from "~/components/helmet-component/HelmetComponent";
import { PAGE_META } from "~/consts/page-meta";

export const FortuneWheel = () => (
    <>
        <HelmetComponent {...PAGE_META.Fortune} />
        <FortuneWheelComponent />
    </>
)