import angular from 'angular';

class ListDialogController {
    constructor(icon, listItems, title, subject, onClick, onSubmit, parentController, $mdDialog) {
        this.parentController = parentController;
        this.$mdDialog = $mdDialog;
        this.icon = icon
        this.listItems = listItems;
        this.subject = subject;
        this.title = title;
        this.onClick = onClick;
        this.onSubmit = onSubmit;
    }
    
    cancel($event) {
        this.$mdDialog.cancel();
    }
    
    selectItem($event) {
        if (this.onClick != null) {
            this.onClick($event);
        }
    }
    
    submit($event) {
        if (this.onSubmit != null) {
            this.onSubmit($event);
        }
        else this.$mdDialog.cancel();
    }
    
    
}

ListDialogController.$inject = ['icon', 'listItems', 'title', 'subject', 'onClick', 'onSubmit', 'parentController', '$mdDialog'];

export { ListDialogController }