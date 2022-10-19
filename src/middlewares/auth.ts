export const checkAuthenticated = (req: any, res: any, next: any) => {
     if (req.isAuthenticated()) { 
          return next();
     }
     res.redirect("/auth/login");
}