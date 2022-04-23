
export interface IResponse { code: string; message: string; }

export interface IPayload { }

export interface ApiResponse extends IResponse { data: IPayload | undefined; }

export interface CommonErrPayload {
    code: string;
    msg: string;
}