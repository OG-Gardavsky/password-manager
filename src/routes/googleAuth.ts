import { Router } from "express";
import passport from "passport";


const router: Router = Router();

router.get('/google',
    passport.authenticate('google', { scope:
        ['email', 'profile'] 
    })
);

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/dashboard',
        failureRedirect: '/auth/login'
    })
);

router.get("/login", (req, res) => {
    res.render('login.ejs');
});


const checkAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) { 
        return next();
    }
    res.redirect("/auth/login");
}

router.get("/dashboard", checkAuthenticated, (req, res) => {
    console.log(req.user)
    res.render("dashboard.ejs", {name: req.user!})
})

router.post("/logout", (req,res) => {
    req.logOut((err) => {
        console.error(err);
    });
    res.redirect("/login");
})

export { router };