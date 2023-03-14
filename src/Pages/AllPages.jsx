import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FooterOverlay, Header, NotFoundPage } from "../components";
import {
    // Blog,
    // BlogDetail,
    // Start,
    Home,
    // PaymentPage,
    // PolicyPayment,
    // PolicyUse,
    // Register,
    // VerificationPage,
    // PasswordBackPage,
    // SendPasswordPage,
    // SignInPage,
    // CreateYourStore,
    // OpenControlPanel,
    // PackagePage,
    // CreateYourStorePayment,
    // YourPolicy,
} from "./index";
// const Home = React.lazy(() => import("./Home"));
const Blog = React.lazy(() => import("./Blog"));
const BlogDetail = React.lazy(() => import("./BlogDetail"));
const Start = React.lazy(() => import("./Start"));
const PolicyPayment = React.lazy(() => import("./PolicyPayment"));
const PolicyUse = React.lazy(() => import("./PolicyUse"));
const PaymentPage = React.lazy(() => import("./PaymentPage"));
const Register = React.lazy(() => import("./Register"));
const RegisterRepresentative = React.lazy(() =>
    import("./RegisterRepresentative")
);
const VerificationPage = React.lazy(() => import("./VerificationPage"));
const PasswordBackPage = React.lazy(() => import("./PasswordBackPage"));
const SendPasswordPage = React.lazy(() => import("./SendPasswordPage"));
const SignInPage = React.lazy(() => import("./SignInPage"));
const CreateYourStore = React.lazy(() => import("./CreateYourStore"));
const OpenControlPanel = React.lazy(() => import("./OpenControlPanel"));
const PackagePage = React.lazy(() => import("./PackagePage"));
const CreateYourStorePayment = React.lazy(() =>
    import("./CreateYourStorePayment")
);
const YourPolicy = React.lazy(() => import("./YourPolicy"));

const AllPages = () => {
    return (
        <>
            <div className="w-100">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Suspense>
                                    <Home />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/blog"
                            element={
                                <Suspense>
                                    <Blog />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/detail/:id"
                            element={
                                <Suspense>
                                    <BlogDetail />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/start"
                            element={
                                <Suspense>
                                    <Start />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/register/:user"
                            element={
                                <Suspense>
                                    <Register />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/packagePage"
                            element={
                                <Suspense>
                                    <PackagePage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/createYourStore"
                            element={
                                <Suspense>
                                    <CreateYourStore />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/openControlPanel"
                            element={
                                <Suspense>
                                    <OpenControlPanel />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/createYourStorePayment"
                            element={
                                <Suspense>
                                    <CreateYourStorePayment />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/paymentPage"
                            element={
                                <Suspense>
                                    <PaymentPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/policyUse"
                            element={
                                <Suspense>
                                    <PolicyUse />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/YourPolicy/:policyID"
                            element={
                                <Suspense>
                                    <YourPolicy />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/policyPayment"
                            element={
                                <Suspense>
                                    <PolicyPayment />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/signInPage"
                            element={
                                <Suspense>
                                    <SignInPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/passwordBackPage"
                            element={
                                <Suspense>
                                    <PasswordBackPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/sendPasswordPage"
                            element={
                                <Suspense>
                                    <SendPasswordPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/verificationPage"
                            element={
                                <Suspense>
                                    <VerificationPage />
                                </Suspense>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <FooterOverlay />
                </BrowserRouter>
            </div>
        </>
    );
};

export default AllPages;
