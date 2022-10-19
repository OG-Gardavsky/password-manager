import { Router } from "express";
import passport from "passport";


const router: Router = Router();

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));

router.get("/login", (req, res) => {
    res.render("../views/login.ejs")
})


const checkAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

router.get("/dashboard", checkAuthenticated, (req, res) => {
    console.log(req.user)
  res.render("dashboard.ejs", {name: req.user!})
})

//Define the Logout
router.post("/logout", (req,res) => {
    req.logOut((err) => {
        console.error(err)
    })
    res.redirect("/login")
    console.log(`-------> User Logged out`)
})

export default router;