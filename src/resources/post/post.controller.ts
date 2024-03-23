import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interfaces';
import HttpException from '@/utils/exception/http.exception';
import validationMiddleware from '@/middleware/validate.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';
import authenticated from '@/middleware/authenticated.middleware';

class PostController implements Controller {
    public path = '/products';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.use(authenticated);

        this.router.get(`${this.path}`, this.getAllProducts);
        this.router.post(`${this.path}`, validationMiddleware(validate.create), this.create);
        this.router.put(`${this.path}/:id`, validationMiddleware(validate.update), this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { product, productPrice } = req.body;
            const post = await this.PostService.create(product, productPrice);
            return res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Unable to create Product'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const productId = parseInt(id, 10)
            const { product, productPrice } = req.body;
            const updatedPost = await this.PostService.update(productId, product, productPrice);
            return res.status(200).json({ updatedPost });
        } catch (error) {
            next(new HttpException(400, 'Unable to update Product'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const productId = parseInt(id, 10)
            await this.PostService.delete(productId);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(new HttpException(400, 'Unable to delete Product'));
        }
    };

    private getAllProducts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const products = await this.PostService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            next(new HttpException(500, 'Internal server error'));
        }
    };
}

export default PostController;
