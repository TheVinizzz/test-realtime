import React from 'react';
import { logout } from "../../actions/accountActions";
import { useSelector } from "react-redux";

export default function Welcome() {
    const uid = useSelector((state) => state.firebase?.auth?.uid);

    return (
        <>
           <h1>Teste RealTime Firebase</h1>
            {!uid ? <a href="/entrar"><button>Logar</button></a>
                :
                null}
                {!uid ? <a href="/cadastro"><button>Registrar</button></a>
                :
                null}
                {uid ? <a href="/app/chat"><button>Entrar no chat</button></a>
                :
                null}
            {uid ? <button onClick={async function () {
                await logout()
            }}>Sair</button>
            :
            null}
        </>
    )
}