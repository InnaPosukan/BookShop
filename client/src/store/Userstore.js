
import{makeAutoObservable} from "mobx"

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._role = ''; // Добавленное поле для хранения роли

        makeAutoObservable(this)
    }
    setIsAuth(bool){
        console.log("setIsAuth:", bool);

        this._isAuth = bool
    }
    setUser(user){
        console.log("setUser:", user);

        this._user = user
    }
    setRole(role) {
      console.log("setRole:", role);
      this._role = role;
  }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get role() {
      return this._role;
  }
}