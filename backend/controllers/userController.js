// userController.js (Corrected Error Handling)

// 1. You should use ESM syntax (import/export) now
import prisma from '../prisma/index.js'; 
import cookietoken from '../utils/cookieToken.js'; 

export const signup = async(req, res) =>{
    try {
        const{name,email,password} = req.body
        
        // --- Line 15 (Validation check) ---
        if(!name || !email || !password){
            // 🛑 RETURN a 400 Bad Request response for validation errors
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // --- Line 20 (Prisma call) ---
        const User = await prisma.user.create({
            data:{
                name,
                email,
                password,
            }
        });

        // Success
        cookietoken(User, res);

    } catch (error) {
        // --- Line 30 (Catch block) ---
        console.error("Signup Failed:", error); // Log the real error for debugging!

        // Handle a PRISMA UNIQUE CONSTRAINT ERROR (e.g., email already exists)
        if (error.code === 'P2002') {
            return res.status(409).json({ // 409 Conflict
                success: false,
                message: 'An account with this email already exists.'
            });
        }
        
        // Handle all other unexpected errors with a 500
        return res.status(500).json({
            success: false,
            message: "An unexpected server error occurred during signup."
        });
    }
}