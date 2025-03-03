import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import {userRouter} from "./src/api/user/user.controller";
import {categoryRouter} from "./src/api/category/category.controller";
import {statusRouter} from "./src/api/status/status.controller";
import {proposalRouter} from "./src/api/proposal/proposal.controller";
import {upvoteRouter} from "./src/api/upvote/upvote.controller";
import swaggerDocs from "./src/utils/swagger";

dotenv.config();

const PORT = process.env.PORT || 4200;

const app = express();

const apiRoutes = express.Router();

async function main() {
    app.use(express.json());

    apiRoutes.use('/user', userRouter);
    apiRoutes.use('/category', categoryRouter);
    apiRoutes.use('/status', statusRouter);
    apiRoutes.use('/proposal', proposalRouter);
    apiRoutes.use('/upvote', upvoteRouter);

    app.use('/api', apiRoutes);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        res.status(500).json({message: 'Something went wrong!'});
    });

    app.all('*', (req, res) => {
        res.status(404).send('Route Not Found');
    })
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);

        swaggerDocs(apiRoutes)
    })
}

main();