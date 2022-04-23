import React, { ErrorInfo } from 'react';

/**
 * error catch component
 */
export class ErrorWrapper extends React.Component {
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error);
        console.error(errorInfo);
    }

    public render() {
        return this.props.children;
    }
}
