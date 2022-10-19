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
        successRedirect: '/passRecord',
        failureRedirect: '/auth/login'
    })
);

router.get('/login', (req, res) => {
    res.render('login.ejs');
});


router.post("/logout", (req,res) => {
    req.logOut((err) => {
        console.error(err);
    });
    res.redirect("/login");
})

export { router };