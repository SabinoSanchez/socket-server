import { Socket } from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados= new UsuarioLista();


export const conectarCliente= (cliente:Socket)=>{

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);


}


export const desconectar= (cliente:Socket)=>{

    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
    });

}

// Escuchar mensaje
export const mensaje= (cliente:Socket, io:SocketIO.Server)=>{

    cliente.on('mensaje', (payload: {de: string, cuerpo:string})=>{

        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);



    })

}

// Configurar usuario
export const configurarUsuario= (cliente:Socket,io:SocketIO.Server)=>{
    cliente.on('configurar-usuario', (payload: {nombre:string}, callback:Function)=>{

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
}



