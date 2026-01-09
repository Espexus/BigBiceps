-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-01-2026 a las 15:35:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bigbicep`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar` (IN `p_idusuario` INT, IN `p_alias` VARCHAR(64), IN `p_edad` INT, IN `p_nacionalidad` VARCHAR(32), IN `p_clave` VARCHAR(256), IN `p_bandera` VARCHAR(256))   BEGIN
	UPDATE usuarios 
    SET alias = p_alias,
    edad = p_edad,
    nacionalidad = p_nacionalidad,
    clave = p_clave,
    bandera = p_bandera
    WHERE id = p_idusuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `consultar_entrenamientos_usuario` (IN `p_idusuario` INT)   BEGIN
	SELECT usuarios.alias alias, usuarios.bandera bandera, entrenamientos.descripcion descripcion, entrenamientos.grupo grupo
    FROM entrenamientos
    INNER JOIN usuarios ON entrenamientos.idusuario = usuarios.id
    WHERE entrenamientos.idusuario = p_idusuario;
    
	

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `datos_usuario` (IN `p_idusuario` INT)   BEGIN
	SELECT alias, nacionalidad, bandera, edad 
    FROM usuarios
    WHERE id = p_idusuario;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `disponibilidad` (IN `p_alias` VARCHAR(64))   BEGIN
	SELECT id
    FROM usuarios
    WHERE alias = p_alias;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `p_alias` VARCHAR(64), IN `p_clave` VARCHAR(256))   BEGIN
	SELECT id
    FROM usuarios
    WHERE alias = p_alias AND
    clave = p_clave;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_entreno` (IN `p_descripcion` VARCHAR(512), IN `p_grupo` VARCHAR(64), IN `p_idusuario` INT)   BEGIN
	INSERT INTO entrenamientos (idusuario, grupo, descripcion)
    VALUES (p_idusuario, p_grupo, p_descripcion);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_usuario` (IN `p_alias` VARCHAR(64), IN `p_clave` VARCHAR(256), IN `p_edad` INT, IN `p_nacionalidad` VARCHAR(32), IN `p_bandera` VARCHAR(256))   BEGIN
	INSERT INTO usuarios (alias, clave, edad, nacionalidad, bandera)
    VALUES (p_alias, p_clave, p_edad, p_nacionalidad, p_bandera);

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamientos`
--

CREATE TABLE `entrenamientos` (
  `id` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `grupo` varchar(64) NOT NULL,
  `descripcion` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrenamientos`
--

INSERT INTO `entrenamientos` (`id`, `idusuario`, `grupo`, `descripcion`) VALUES
(1, 1, 'brazos', 'ayer hice ejercicio para llegar guapo y perfumo a donde la polola');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `alias` varchar(64) NOT NULL,
  `nacionalidad` varchar(32) NOT NULL,
  `bandera` varchar(256) NOT NULL,
  `edad` int(11) NOT NULL,
  `clave` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `alias`, `nacionalidad`, `bandera`, `edad`, `clave`) VALUES
(1, 'creador', 'Colombia', 'imgs/colombia.png', 21, 'jhve'),
(2, 'YuliFitness', 'Colombia', 'imgs/colombia.jpg', 21, '1221');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  ADD CONSTRAINT `entrenamientos_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
