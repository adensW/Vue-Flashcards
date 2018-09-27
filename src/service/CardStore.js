export function GetCard(config){
    if (typeof config.index === 'undefined') {
        return "";
    } else {
        return   [{
            "id":"0",
            "front":"test1",
            "back":"test2"
        }];
    }
}
