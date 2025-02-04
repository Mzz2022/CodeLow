// import { Modal as AntdModal } from 'antd';
// import { forwardRef, useImperativeHandle, useState } from 'react';
// import { CommonComponentProps } from '../../interface';

// export interface ModalRef {
//     open: () => void
//     close: () => void
// }

// const Modal: React.ForwardRefRenderFunction<ModalRef, CommonComponentProps> = ({ children, title, onOk, onCancel, styles }, ref) => {

//   const [open, setOpen] = useState(false);

//   useImperativeHandle(ref, () => {
//     return {
//       open: () => {
//         setOpen(true);
//       },
//       close: () => {
//         setOpen(false);
//       }
//     }
//   }, []);

//   return (
//     <AntdModal
//       title={title}
//       style={styles}
//       open={open}
//       onCancel={() => {
//         onCancel && onCancel();
//         setOpen(false);
//       }}
//       onOk={() => {
//         onOk && onOk();
//       }}
//       destroyOnClose
//     >
//       {children}
//     </AntdModal>
//   );
// }

// export default forwardRef(Modal);
import { Modal as AntdModal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CommonComponentProps } from '../../interface';

// 定义 ModalRef 接口
export interface ModalRef {
    open: () => void;
    close: () => void;
}

// 修改 Modal 组件的类型定义，使用 Omit<CommonComponentProps, "ref">
const Modal: React.ForwardRefRenderFunction<ModalRef, Omit<CommonComponentProps, "ref">> = ({ children, title, onOk, onCancel, styles }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setOpen(true);
            },
            close: () => {
                setOpen(false);
            }
        };
    }, []);

    return (
        <AntdModal
            title={title}
            style={styles}
            open={open}
            onCancel={() => {
                onCancel && onCancel();
                setOpen(false);
            }}
            onOk={() => {
                onOk && onOk();
            }}
            destroyOnClose
        >
            {children}
        </AntdModal>
    );
};

// 导出使用 forwardRef 包裹的 Modal 组件
export default forwardRef(Modal);