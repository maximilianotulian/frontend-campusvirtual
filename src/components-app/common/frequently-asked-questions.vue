<template lang="html">
    <Page class="frequently-asked-questions" flexDirection="column">
        <div class="frequently-asked-questions--title">
            <h1>Manual de usuario</h1>
        </div>
        <div class="frequently-asked-questions--content">
            <CDrawer v-for="question in questions" :title="question.title">
                <section class="frequently-asked-questions--content-item">
                    {{ question.content }}
                </section>
            </CDrawer>
        </div>
    </Page>
</template>

<script>
import CDrawer from 'components/c-drawer';
import Page from 'components-app/layout/page';
import _ from 'lodash';

export default {
    name: 'FrequentlyAskedQuestions',

    computed: {
        questions() {
            return [
                {
                    title: 'Tipos de usuario',
                    content: 'Los tipos de usuarios disponibles en el sistema Campus Virtual son administrador, profesor y alumno.'
                },
                {
                    title: 'Crear un usuario administrador',
                    content: 'Para crear un usuario administrador debe contactarse con el soporte técnico del Campus Virtual(contacto@campusvirtual.com).' +
                    'El usuario administrador será creado dentro de los próximos tres días hábiles de llegada la solicitud.'
                },
                {
                    title: 'Funcionalidades asociadas al administrador',
                    content: 'El administrador es el encargado de la gestión de departamentos y cátedras.' +
                    'Por gestión se entiende la funcionalidad de creación, edición y eliminación tanto de departamentos como de cátedras.' +
                    'Es el encargado de invitar a los profesores para que se registren en el sistema.' +
                    'Además, puede visualizar un listado de los estudiantes del sistema.'
                },
                {
                    title: 'Crear un nuevo departamento',
                    content: 'Para crear un nuevo departamento se debe ingresar con un usuario administrador.' +
                        'Seleccionar la opción "Departamentos" del menú lateral. Hacer click en el botón agregar,' +
                        'posicionado abajo a la derecha. Completar el formulario con los datos del departamento, título y descripción y presionar guardar.' +
                        'Tanto el campo título como descripción son obligatorios para realizar la creación.'
                },
                {
                    title: 'Editar o eliminar un departamento',
                    content: 'Para editar o eliminar un departamento se debe ingresar con un usuario administrador.' +
                        'Seleccionar la opción "Departamentos" del menú lateral.' +
                        'Hacer click en el lapíz o en el tacho de basura asociado al departamento que se quiere modificar o eliminar respectivamente.' +
                        'Editar los campos si corresponde y luego presionar guardar.'
                },
                {
                    title: 'Crear una cátedra',
                    content: 'Para crear una cátedra se debe ingresar con un usuario administrador.' +
                    'Seleccionar la opción "Cátedras" del menú lateral. Hacer click en el botón agregar,' +
                    'posicionado abajo a la derecha. Completar el formulario con los datos de la cátedra.' +
                    'Los campos son título, especialidad, descripción y profesor.' +
                    'Los campos título, especialidad y descripción son obligatorios. El campo profesor puede ser cargado en una instancia posterior.'
                },
                {
                    title: 'Editar o eliminar una cátedra',
                    content: 'Para editar o eliminar una cátedra se debe ingresar con un usuario administrador.' +
                    'Seleccionar la opción "Cátedras" del menú lateral.' +
                    'Hacer click en el lapíz o en el tacho de basura asociado a la cátedra que se quiere modificar o eliminar respectivamente.' +
                    'Editar los campos si corresponde y luego presionar guardar.'
                },
                {
                    title: 'Crear un usuario profesor',
                    content: 'Para crear un usuario profesor se debe ingresar con un usuario administrador.' +
                    'Seleccionar la opción "Profesores" del menú lateral. Hacer click en el botón agregar, ' +
                    'posicionado abajo a la derecha. Completar el formulario con el mail del profesor a invitar ' +
                    'y presionar guardar. El sistema Campus Virtual va a enviar un mail al correo del profesor ingresado.' +
                    'El profesor ingresa al link en el correo recibido, completa el formulario y presiona crear cuenta. ' +
                    'Los campos del formulario de creación de profesor son nombre, apellido, usuario, email, especialidad, contraseña y repetir contraseña. ' +
                    'Todos los campos son necesarios.'
                },
                {
                    title: 'Funcionalidades asociadas al profesor',
                    content: 'El profesor es el encargado de las cátedras a las que pertenece.' +
                    'Puede aceptar las solicitudes de inscripción de los estudiantes. Puede crear, editar o eliminar noticias.' +
                    'Puede crear exámenes e invitar a los estudiantes a que participen de él. También, podrá registrar las notas asociadas al mismo.' +
                    'Puede crear eventos o recordatorios en su calendario.'
                },
                {
                    title: 'Crear un usuario estudiante',
                    content: 'Para crear un usuario estudiante se debe ingresar a la home del campus virtual.' +
                    'Hacer click en el botón "Crear cuenta" que se encuentra a la izquierda del botón “iniciar sesión”.'+
                    'Completar el formulario y presionar crear cuenta. Los campos del formulario de creación de estudiante' +
                    'son nombre, apellido, usuario, email, especialidad, contraseña y repetir contraseña. Todos los campos son necesarios.'
                },
                {
                    title: 'Funcionalidades asociadas al estudiante',
                    content: 'El estudiante puede visualizar las materias que tiene disponible.' +
                    'Puede inscribirse a una materia. Puede ver las noticias creadas por los profesores.' +
                    'Puede crear eventos o recordatorios en su calendario. Puede ver el resultado de los exámenes en los que participo.'
                }
            ]
        }
    },

    components: { CDrawer, Page }
}
</script>

<style lang="sass" src="./frequently-asked-questions.scss"></style>