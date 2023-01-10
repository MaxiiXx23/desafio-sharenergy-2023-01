import { Routes, Route } from "react-router-dom";

import { RequireAuth } from "./requiredAuth";
import { AuthLogin } from "./AuthLogin";

import { LoginPage } from "../pages/LoginPage";
import { ListUsers } from "../pages/ListUsers";
import { HttpCat } from "../pages/HttpCat";
import { RandomDog } from "../pages/RandomDog";
import { Clients } from "../pages/clients";
import { AddClient } from "../pages/AddClient";

export function RoutesApp() {

    return (
        <Routes>
            <Route index path="/" element={<AuthLogin children={<LoginPage/>} />} />
            <Route path="/listUsers" element={<RequireAuth children={<ListUsers />} />} />
            <Route path="/httpCat" element={<RequireAuth children={<HttpCat />} />} />
            <Route path="/randomDog" element={<RequireAuth children={<RandomDog />} />} />
            <Route path="/clients" element={<RequireAuth children={<Clients />} />} />
            <Route path="/addClient" element={<RequireAuth children={<AddClient />} />} />
        </Routes>
    )
}