import {User} from 'firebase';
import firebase from "../firebase/firebase";
import {BehaviorSubject} from "rxjs";
import {takeWhile} from 'rxjs/operators';

class AuthService {
    auth: firebase.auth.Auth;
    currentUser = new BehaviorSubject<User | null>(null);
    initialized = new BehaviorSubject(false);
    onLogout: any;

    constructor() {
        this.auth = firebase.auth();
        this.auth.onAuthStateChanged((u) => {
            this.currentUser.next(u);
            this.initialized.next(true);
            if(u == null){
                this.onLogout?.call();
            }
        });
    }

    ensureInitialized() {
        return this.initialized.pipe(takeWhile(v => !v)).toPromise();
    }

    async loginWithEmailAndPassword(email: string, password: string){
        var result = await this.auth.signInWithEmailAndPassword(email, password);
        return result.user;
    }

    async logout() {
        await this.auth.signOut();
    }

    isAuthenticated() {
        return this.currentUser.value != null;
    }

    async registerWithEmailAndPassword(email: string, password: string){
        var result = await this.auth.createUserWithEmailAndPassword(email, password);
        return result.user;
    }
}

const authService = new AuthService();


export default authService;
