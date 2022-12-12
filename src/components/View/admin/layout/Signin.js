import '../../../../asset/admin/css/custom.css'

const Signin = (props) => {
    let StateData = props.stateData;
    return (
        <main className="main h-100 w-100">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">ADMIN</h1>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">

                                        <form>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input className={StateData.error.email ? "inputerror form-control form-control-lg" : "form-control form-control-lg"} type="email" name="email" value={StateData.email} onChange={(e) => { props.changevalue(e) }} placeholder="Enter your email"  />
                                                <p className='error'>{StateData.error ? StateData.error.email ? StateData.error.email : "" : ""}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className={StateData.error.password ? "inputerror form-control form-control-lg" : "form-control form-control-lg"} type="password" name="password" value={StateData.password} onChange={(e) => { props.changevalue(e) }} placeholder="Enter your password" />
                                                <p className='error'>{StateData.error ? StateData.error.password ? StateData.error.password : "" : ""}</p>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button type="button" onClick={(e) => props.onSubForm(e)} className="btn btn-lg btn-primary">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Signin;