import {Request, Response, Router} from "express";
import {UserService} from "@/api/user/user.service";
import {authMiddleware} from "@/auth.middleware";
import {SafeParseReturnType} from "zod";
import {loginUserDto, registrationUserDto} from "@/api/user/user.dto";
import {RegistrationUser, SecureUser, User} from "@/api/user/user.type";
import {asyncHandler} from "@/utils/handler-error";


const router = Router();

const userService = new UserService();

router.post('/registration', asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await registrationUserDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
        return;
    }

    try {
        if (await userService.userIsExist(req.body.email)) {
            res.status(400).json({message: 'User already exists'});
            return;
        } else {
            const user: RegistrationUser = await userService.createUser(req.body);
            res.status(201).send(user);
        }
    } catch (error) {
        res.status(422).json({message: error});
    }

}));

router.post('/login', asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await loginUserDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
        return;
    }

    const {email, password} = req.body;

    try {
        const user: User | null = await userService.userIsExist(email);
        if (!user) {
            res.status(404).json({message: 'User does not exist'});
            return
        }

        const isExistPassword = await userService.signIn(password, user!.password);
        if (!isExistPassword) {
            res.status(404).json({message: 'User does not exist'});
        }

        const createdUser: SecureUser | null = userService.restructureUser(user);
        res.status(200).json({
            user: createdUser,
            jwt: userService.createJwtToken({id: createdUser!.id, role: createdUser!.role})
        });
    } catch (error) {
        res.status(422).json({message: error});
    }
}));

router.get('/', authMiddleware, asyncHandler (async (req: Request, res: Response) => {
    const authToken: string = req.headers['authorization']!.replace('Bearer ', '');
    try {
        const user: SecureUser | null = await userService.getUser(authToken);
        console.log(user);
        if (!user) {
            res.status(404).json({message: 'User not exists'});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

export const userRouter = router;
