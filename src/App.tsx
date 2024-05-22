import {useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import API from './API/api';

function App() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
    });

    const [tableData, setTableData] = useState([]);

    const [errmsg, setErrmsg] = useState('');

    const addUserAction = async () => {
        console.log('sending data...');
        await API.post('/user/add', user)
            .then(res => {
                console.log(res);
                setErrmsg('');
                setUser({
                    username: '',
                    email: '',
                    phone: '',
                });
                document.getElementById('closeaddmodel').submit();
                getUsers();
            })
            .catch(err => {
                // console.log(err);
                if (err.response.data) {
                    if (err.response.data.errorResponse) {
                        const errMsg: string =
                            err.response.data.errorResponse.errmsg;
                        console.log(errMsg);
                        setErrmsg(errMsg);
                    }
                    const errdata: string = err.response.data;
                    const startAt: number = errdata.search('<pre>Error: ') + 12;
                    const endsAt: number = errdata.search('<br>');
                    const slicedErr: string = errdata.slice(startAt, endsAt);
                    console.log(slicedErr);
                    setErrmsg(slicedErr);
                }
            });
    };

    const deleteUserAction = async (id: string) => {
        console.log(`sending delete request for ${id} ...`);
        await API.post('/user/delete', {id: id})
            .then(res => {
                console.log(res);
                document.getElementById('closedeletemodel_' + id).submit();
                getUsers();
            })
            .catch(err => {
                // document.getElementById('closedeletemodel_' + id).submit();
                console.log(err);
            });
    };

    const editUserAction = async (id: string) => {
        console.log(`sending edit request for ${id} ...`);
        await API.post('/user/edit', {
            id: id,
            username: user.username,
            email: user.email,
            phone: user.phone,
        })
            .then(res => {
                console.log(res);
                setErrmsg('');
                setUser({
                    username: '',
                    email: '',
                    phone: '',
                });
                document.getElementById('closeeditmodel_' + id).submit();
                getUsers();
            })
            .catch(err => {
                // console.log(err);
                if (err.response.data) {
                    if (err.response.data.errorResponse) {
                        const errMsg: string =
                            err.response.data.errorResponse.errmsg;
                        console.log(errMsg);
                        setErrmsg(errMsg);
                    }
                    const errdata: string = err.response.data;
                    const startAt: number = errdata.search('<pre>Error: ') + 12;
                    const endsAt: number = errdata.search('<br>');
                    const slicedErr: string = errdata.slice(startAt, endsAt);
                    console.log(slicedErr);
                    setErrmsg(slicedErr);
                }
            });
    };

    const getUsers = async () => {
        await API.get('/user/getall')
            .then(res => {
                console.log(res);
                setTableData(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="/bg-black /text-white w-full h-screen flex relative justify-center items-center">
            <div className="w-full max-w-[1200px]">
                <div>
                    <button
                        className="btn btn-primary rounded-full px-10"
                        onClick={() =>
                            document.getElementById('my_modal_1').showModal()
                        }>
                        Add
                    </button>
                </div>
                <table className="table mt-10">
                    <thead>
                        <tr>
                            <th>userid</th>
                            <th>username</th>
                            <th>phone</th>
                            <th>email</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    {tableData.length > 0 ? (
                        <tbody>
                            {tableData.map((data, index) => (
                                <tr>
                                    <td>{data._id}</td>
                                    <td>{data.username}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary rounded-full px-10"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        'editmodel_' + data._id,
                                                    )
                                                    .showModal();
                                                setUser({
                                                    username: data.username,
                                                    email: data.email,
                                                    phone: data.phone,
                                                });
                                                setErrmsg('');
                                            }}>
                                            Edit
                                        </button>
                                        <dialog
                                            id={'editmodel_' + data._id}
                                            className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">
                                                    edit User {data._id}
                                                </h3>
                                                <p className="py-4">
                                                    edit details you want to
                                                    edit
                                                </p>
                                                {errmsg ? (
                                                    <p className="py-4 text-red-400">
                                                        {errmsg}
                                                    </p>
                                                ) : null}
                                                <div className="space-y-3">
                                                    <label className="input input-bordered flex items-center gap-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 16 16"
                                                            fill="currentColor"
                                                            className="w-4 h-4 opacity-70">
                                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            className="grow"
                                                            placeholder="Username"
                                                            value={
                                                                user.username
                                                            }
                                                            onChange={e =>
                                                                setUser({
                                                                    ...user,
                                                                    username:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                        />
                                                    </label>

                                                    <label className="input input-bordered flex items-center gap-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 16 16"
                                                            fill="currentColor"
                                                            className="w-4 h-4 opacity-70">
                                                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            className="grow"
                                                            placeholder="Email"
                                                            value={user.email}
                                                            onChange={e =>
                                                                setUser({
                                                                    ...user,
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                        />
                                                    </label>

                                                    <label className="input input-bordered flex items-center gap-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-4 h-4 opacity-70">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <input
                                                            type="text"
                                                            className="grow"
                                                            placeholder="Phone"
                                                            value={user.phone}
                                                            onChange={e =>
                                                                setUser({
                                                                    ...user,
                                                                    phone: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                                <div className="flex space-x-5 items-center justify-end">
                                                    <div className="modal-action">
                                                        <form
                                                            id={
                                                                'closeeditmodel_' +
                                                                data._id
                                                            }
                                                            method="dialog"
                                                            className="">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            editUserAction(
                                                                data._id,
                                                            )
                                                        }
                                                        className="btn btn-accent mt-[1.5rem]">
                                                        edit User
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>
                                        <button
                                            className="btn btn-primary rounded-full px-10"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        'deletemodel_' +
                                                            data._id,
                                                    )
                                                    .showModal()
                                            }>
                                            Delete
                                        </button>
                                        <dialog
                                            id={'deletemodel_' + data._id}
                                            className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">
                                                    Confirm Deletion
                                                </h3>
                                                <p className="py-4">
                                                    Are you sure you want to
                                                    delete {data.username}{' '}
                                                </p>
                                                <div className="flex space-x-5 items-center justify-end">
                                                    <button
                                                        onClick={() =>
                                                            deleteUserAction(
                                                                data._id,
                                                            )
                                                        }
                                                        className="btn btn-accent mt-[1.5rem]">
                                                        Delete
                                                    </button>
                                                    <div className="modal-action">
                                                        <form
                                                            id={
                                                                'closedeletemodel_' +
                                                                data._id
                                                            }
                                                            method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : null}
                </table>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add User</h3>
                    <p className="py-4">Add details you want to add</p>
                    {errmsg ? (
                        <p className="py-4 text-red-400">{errmsg}</p>
                    ) : null}
                    <div className="space-y-3">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username"
                                value={user.username}
                                onChange={e =>
                                    setUser({...user, username: e.target.value})
                                }
                            />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                value={user.email}
                                onChange={e =>
                                    setUser({...user, email: e.target.value})
                                }
                            />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <input
                                type="text"
                                className="grow"
                                placeholder="Phone"
                                value={user.phone}
                                onChange={e =>
                                    setUser({...user, phone: e.target.value})
                                }
                            />
                        </label>
                    </div>
                    <div className="flex space-x-5 items-center justify-end">
                        <div className="modal-action">
                            <form
                                id="closeaddmodel"
                                method="dialog"
                                className="">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                        <button
                            onClick={() => addUserAction()}
                            className="btn btn-accent mt-[1.5rem]">
                            Add User
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default App;
