import atool from './tools/atinytool.0.1.0'
class input {
    constructor(){
        this.tool = atool();
    }
    
    init(){
        let inputs = [];
        inputs.push(...document.getElementsByTagName("input"));
        inputs.push(...document.getElementsByTagName("textarea"))
        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            element.addEventListener("focus",function(event){
                event.target.nextElementSibling.setAttribute("class","active")
            })  
            element.addEventListener("blur",function(event){
                if(atool().isNullOrWhiteSpace(event.target.value)){
                    event.target.nextElementSibling.classList.remove("active")
                }
            })  
        }
    }
}
export default input;