import React from "react";
import "./authPage.css";
import { Auth } from "../../components/Auth/Auth";

export function AuthPage() {
    return (
        <div className="auth-page">
            <div className="auth-page__content">
                <Auth/>
            </div>
        </div>
    )
}
