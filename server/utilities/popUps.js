
module.exports = {
    PopUpCollection: PopUpCollection
}


function PopUpCollection(){
    this.messages = []

}

PopUpCollection.prototype.addInfo = function(text){
    let msg = {type: 'info', text: text}
    this.messages.push(msg)
};

PopUpCollection.prototype.addSuccess = function(text){
    let msg = {type: 'success', text: text}
    this.messages.push(msg)
};

PopUpCollection.prototype.addError = function(text){
    let msg = {type: 'error', text: text}
    this.messages.push(msg)
};