export type TIDParams = { id: number; };

export type MulterRequest extends Request = {
    file: Express.Multer.File;
}