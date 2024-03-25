import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interfaces';
import HttpException from '@/utils/exception/http.exception';
import validationMiddleware from '@/middleware/validate.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';
import authenticated from '@/middleware/authenticated.middleware';

//yeah our Post Product controller
//it takes in all our path, we have a public path here which is products, our route goes like this "localhost/api/products"
class PostController implements Controller {
    public path = '/products';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {

      //we are doing 4 things here with our products which are creating, updating, deleting and getting all products
      //each of them goes through our authentication with bearer token(we imported the authenticated middleware above)
      // create and update also go through our validationMiddleware with joi which validate req.body
      // in our schema we created a unique id for each product and that help us bring our delete andn update to life
        this.router.get(`${this.path}`, authenticated, this.getAllProducts);
        this.router.post(`${this.path}`, validationMiddleware(validate.create), authenticated, this.create);
        this.router.put(`${this.path}/:id`, validationMiddleware(validate.update), authenticated, this.update);
        this.router.delete(`${this.path}/:id`, authenticated, this.delete);
    }

    //create func with our req.Body(this is what most be added to our api call) and this are productname and productPrice
    //our http error exception helps use to handle error dilligently also, i am writing my error out tho but that is just how i feel
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

    //kind of the same with create becausew that have the req of Body but most importantly our update path takes the uniquely created id (req.params) and i have to convert it to number because req.params takes in string
    // we have a good error handling measure here also
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

    //our delete func only takes in the req.params with the path (localhost/api/products/3) 3 is the id of the object we want to delete
    //our error is equally called well here also because we dont want to be hardcoding during debugs
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

    //for get all products, we go through the normal path and use the get request. 
    //deosnot takes in any body or params, neither does it have any extra path attached to it
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
