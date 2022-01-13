export default class FilmsStorage {
    constructor() {
      this._currentPage = []
      this.refreshData();
    }
    refreshData() {
      if (localStorage.getItem('currentPage')) {
        this._currentPage = JSON.parse(localStorage.getItem('currentPage'));
      }
    }
    addToCurrent(item) {

 
        if(this._currentPage.length == 0){
            this._currentPage.push(item);  
            this.saveCurrentPage();
        }else{
            this._currentPage = []
            this._currentPage.push(item);  
            this.saveCurrentPage();
        }
  
    }
    saveCurrentPage() {
        localStorage.setItem('currentPage', JSON.stringify(this._currentPage));
      }
}