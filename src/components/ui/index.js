import ABtn from './button/ABtn';
import AIcon from './button/AIcon';
import ACard from './layout/ACard';
import ADrawer from './layout/ADrawer';
import AListItem from './layout/AListItem';
import AList from './layout/AList';
import ANavItem from './layout/ANavItem';
import ANav from './layout/ANav';
import AMask from './popup/AMask';
import ACarouselItem from './view/carousel/ACarouselItem';
import ACarousel from './view/carousel/ACarousel';
const AUIs={
    ABtn,
    AIcon,
    ACard,
    ADrawer,
    AListItem,
    AList,
    ANavItem,
    ANav,
    AMask,
    ACarouselItem,
    ACarousel,
}
const AdensUI={}
AdensUI.install = function (Vue) {
    Object.keys(AUIs).forEach(key => {
        Vue.component(key, AUIs[key]);
    });
}
export default AdensUI;