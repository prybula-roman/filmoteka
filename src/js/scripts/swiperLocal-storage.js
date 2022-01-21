export default class FilmsSwiperStorage {
    constructor() {
      this._currentSwiperPage = []
      this.refreshData();
    }
    refreshData() {
      if (localStorage.getItem('currentSwiperPage')) {
        this._currentSwiperPage = JSON.parse(localStorage.getItem('currentSwiperPage'));
      }
    }
    addToCurrentSwiper(item) {

 
        if(this._currentSwiperPage.length === 0){
            this._currentSwiperPage.push(item);  
            this.saveCurrentSwiperPage();
        }else{
            this._currentSwiperPage = []
            this._currentSwiperPage.push(item);  
            this.saveCurrentSwiperPage();
        }
  
    }
    saveCurrentSwiperPage() {
        localStorage.setItem('currentSwiperPage', JSON.stringify(this._currentSwiperPage));
      }
}