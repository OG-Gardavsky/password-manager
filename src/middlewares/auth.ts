export const checkAuthenticated = (req: any, res: any, next: any) => {
     if (req.isAuthenticated()) { 
          return next();
     }
     return res.redirect("/auth/login");
}