-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: thegamestore
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Oferta'),(2,'Popular');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `metodoDePago_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `metodoDePago_id` (`metodoDePago_id`),
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`metodoDePago_id`) REFERENCES `metodosdepago` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodosdepago`
--

DROP TABLE IF EXISTS `metodosdepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodosdepago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodosdepago`
--

LOCK TABLES `metodosdepago` WRITE;
/*!40000 ALTER TABLE `metodosdepago` DISABLE KEYS */;
INSERT INTO `metodosdepago` VALUES (1,'Crédito'),(2,'Débito'),(3,'MercadoPago');
/*!40000 ALTER TABLE `metodosdepago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `factura_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `factura_id` (`factura_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Placa de Video ASUS Phoenix GeForce GTX 1630 4GB GDDR6','La Placa de Video ASUS Phoenix GeForce GTX 1630 4GB GDDR6 ofrece un rendimiento gráfico potente con 4GB de memoria GDDR6, adecuada para juegos y aplicaciones intensivas. La serie Phoenix de ASUS se destaca por su diseño compacto y eficiente, proporcionando un equilibrio entre rendimiento y espacio.','Placa_de_Video_ASUS_Phoenix_GeForce_GTX_1630_4GB_GDDR6.jpg',1,23,250000.00),(2,'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler','El Procesador AMD RYZEN 3 3200G con 4.0GHz de Turbo y gráficos Radeon Vega 8 es una opción potente para tareas diarias y juegos ligeros, con refrigeración Wraith Stealth para un rendimiento eficiente y silencioso. Este procesador AMD está diseñado para ofrecer un equilibrio entre rendimiento y ahorro de energía','Procesador_AMD_RYZEN_3_3200G_4.0GHz_Turbo___Radeon_Vega_8_AM4_Wraith_Stealth_Cooler.jpg',2,12,110000.00),(3,'Mother MSI A520M-A PRO DDR4 AM4','La placa base MSI A520M-A PRO DDR4 AM4 proporciona una plataforma fiable para procesadores AMD Ryzen, con soporte para memoria DDR4 y características esenciales para construir sistemas eficientes y estables. Su diseño robusto y su compatibilidad con la arquitectura AM4 la hacen adecuada para diversas aplicaciones y configuraciones.','Mother_MSI_A520M-A_PRO_DDR4_AM4_29d05f8c-grn.jpg',1,34,88950.00),(4,'Mother Asrock Z390 Phantom Gaming 4S','La placa madre Asrock Z390 Phantom Gaming 4S es un modelo diseñado para soportar procesadores Intel de la serie 9th y 8th Gen. Pertenece a la línea Phantom Gaming de Asrock, que se centra en ofrecer características orientadas a los juegos y rendimiento.','Mother_Asrock_Z390_Phantom_Gaming_4S_Wi-Fi_BULK_Pack.jpg',2,54,48600.00),(5,'Gabinete Antec NX292 MESH RGB Vidrio Templado','El gabinete Antec NX292 MESH RGB es un chasis para computadora diseñado para ofrecer un equilibrio entre funcionalidad y estética, con un enfoque particular en la refrigeración y la iluminación RGB.','Gabinete_Antec_NX292_MESH_RGB_Vidrio_Templado.jpg',1,5,69900.00),(6,'Notebook Dell Inspiron 3525 IPS FHD 15.6','La Dell Inspiron 3525 es una computadora portátil económica que ofrece un buen equilibrio entre rendimiento y precio. Está equipada con una pantalla IPS FHD de 15.6 pulgadas, un procesador AMD Ryzen 5, 8 GB de RAM y 256 GB de almacenamiento SSD. Esto la hace adecuada para tareas básicas como navegar por Internet, ver videos y trabajar con documentos. También puede manejar algunos juegos y aplicaciones más exigentes, pero no será la mejor opción para los jugadores o creadores de contenido profesionales.','Notebook_Dell_Inspiron_3525_IPS_FHD_15.6__Ryzen_5_5625U_8GB_256GB_SSD_NVMe_W11_Home_120Hz_31bafa22-grn.jpg',2,5,641000.00),(7,'Monitor Gamer Samsung 24 pulgadas G50 Curvo 144Hz Full HD VA FreeSync','El monitor también cuenta con la tecnología FreeSync, que ayuda a eliminar el desgarro de la pantalla y los parpadeos. Además, tiene un modo juego que optimiza la configuración del monitor para los juegos.','Monitor_Gamer_Samsung_24__G50_Curvo_144Hz_Full_HD_VA_FreeSync.jpg',1,7,209900.00),(8,'Fuente Corsair 650W 80 Plus Bronze CV650','La CV650 cuenta con un ventilador de 120 mm que gira a una velocidad variable para mantener una temperatura óptima. La fuente también cuenta con protección contra sobretensiones, sobrecorrientes, sobrecalentamiento y cortocircuitos.','Fuente_Corsair_650W_80_Plus_Bronze_CV650_.jpg',2,13,88100.00),(9,'Teclado Gaming Retroiluminado Wesdar MK4 BR','El teclado Gaming Retroiluminado Wesdar MK4 BR es un periférico diseñado específicamente para satisfacer las necesidades de los jugadores, ofreciendo características centradas en la experiencia de juego y un diseño retroiluminado para un aspecto llamativo.','Teclado_Gaming_Retroiluminado_Wesdar_MK4_BR.jpg',1,9,3850.00),(10,'Parlantes Logitech S150 Black USB 2.0','Los parlantes Logitech S150 Black USB 2.0 son una solución de audio asequible para computadoras de escritorio y portátiles. Son compactos y fáciles de configurar, y ofrecen un sonido claro y potente.','Parlantes_Logitech_S150_Black_USB_2.0_912abc90-grn.jpg',2,67,14400.00),(11,'Pasta Termica Cooler Master RPD Grease High Performance','La Pasta Térmica Cooler Master RPD Grease High Performance es una pasta térmica de alto rendimiento diseñada para mejorar la transferencia de calor entre el procesador y el disipador térmico. Está hecha de una mezcla de siliconas y otros compuestos que proporcionan una conductividad térmica excepcional.','Pasta_Termica_Cooler_Master_RPD_Grease_High_Performance_af33dad9-grn.jpg',1,4,5800.00),(12,'Silla Gamer Vertagear Racing Series PL-4500 Crystals from Swarovski','La Silla Gamer Vertagear Racing Series PL-4500 Crystals from Swarovski es una silla gamer de gama alta con un diseño elegante y características premium.','Silla_Gamer_Vertagear_Racing_Series_PL-4500_Crystals_from_Swarovski.jpg',2,54,776200.00),(13,'Estabilizador Desktop TCA-1200N LYONN AVR','El estabilizador Desktop TCA-1200N LYONN AVR es un dispositivo diseñado para proporcionar protección a los equipos electrónicos y electrodomésticos al estabilizar el suministro eléctrico','Estabilizador_Desktop_TCA-1200N_LYONN_AVR.jpg',1,3,19000.00),(14,'UPS Lyonn CTB-800V 800AP','La UPS (Sistema de Alimentación Ininterrumpida) Lyonn CTB-800V 800VA es un dispositivo diseñado para proporcionar respaldo de energía a dispositivos electrónicos durante cortes de energía.','UPS_Lyonn_CTB-800V_800AP.jpg',2,13,28400.00),(16,'Joystick Redragon Saturn G807 PC','El Joystick Redragon Saturn G807 para PC es un controlador de juegos diseñado para ofrecer una experiencia de juego cómoda y versátil.','Joystick_Redragon_Saturn_G807_PC.jpg',2,18,23100.00),(19,'placa 4090','NVIDIA® GeForce RTX® 4090 es la GPU GeForce definitiva. Brinda un gran salto en rendimiento, eficiencia y gráficos impulsados ​​​​por IA. Experimenta juegos de rendimiento ultra alto, mundos virtuales increíblemente detallados, productividad sin precedentes y nuevas formas de crear. Está impulsada por la arquitectura NVIDIA Ada Lovelace y viene con 24 GB de memoria G6X para brindar la mejor experiencia para jugadores y creadores.','1708908725689-placa4090.jpg',1,1,300000.00),(20,'Placa de video Nvidia Asus TUF Gaming GeForce RTX 30 Series RTX 3060 Ti TUF-RTX3060TI-O8G-V2-GAMING ','Placa de video Nvidia Asus TUF Gaming GeForce RTX 30 Series RTX 3060 Ti TUF-RTX3060TI-O8G-V2-GAMING OC Edition 8GB','image-1708923179981',1,2,500000.00),(37,'PCARM-727-14-3200G-240SSD-16GB-500','Marca: Armada\r\nTamaño del disco duro: 500 GB\r\nEs gamer: Sí\r\nCondición del ítem: Nuevo\r\nTipo de procesador: AMD Ryzen 3 3200G\r\nRAM: 16 GB\r\nSKU: PCARM-727-14-3200G-240SSD-16GB-500','image-1708922977268',1,2,596819.00),(38,'Auricular Hyperx Cloud Stinger Core','Los HyperX Cloud Stinger Core son unos auriculares para jugar de diseño ligero y duraderos a un gran precio. Su calidad de sonido envolvente está potenciada por controladores de 40 mm con medios y agudos claros, y unos graves de impacto.\r\nMejora tu experiencia de chat con tus amigos gracias a su micrófono con cancelación de ruido, que suprime el ruido ambiente y se centra en tu voz. Puedes añadir de forma opcional un sonido envolvente virtual 7.11 potenciado por el software NGENUITY tanto en la versión con cables como en la versión inalámbrica. El sonido envolvente añade otro nivel de inmersión que también te ayuda a percibir los sonidos de enemigos en el juego con sonido posicional más preciso. Con la opción inalámbrica, puedes realizar la configuración libre de cables sin preocuparte de la latencia del audio. No importa la opción que elijas, el Cloud Stinger Core son unos auriculares de juego fiables que siempre están listos para jugar todos los días.','image-1708923392408',2,5,56000.00),(39,'placa 4060','placa 4060','profile-1709010781805-332955479.jpg',1,1,1500000.00);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'usuario'),(2,'administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'ignacio','iturbe','prueba1@gmail.com','$2a$12$MFDS/8S.z4.TTK5hldMpGefy65eOdL7ta4AcDXToniBPxZPPsGu4G',NULL,'profile-1709006798873-888073840.jpg','2024-02-28 22:19:59','2024-02-28 22:19:59'),(2,'tamara','petti','prueba2@gmail.com','$2b$12$gIl3ZfOPoapzUKMfrIw8O.q.ipL6qkl7YU7g4wiSNS8Z60Y6Vc8Mm',NULL,'profile-1709008837477-68945770.jpg','2024-02-28 22:19:59','2024-02-28 22:19:59'),(3,'alejandro','vittar','prueba3@gmail.com','$2b$12$V2u.p0ZkhOHH.1hDNi8KfuO4j8ratQldFkZLJh26TyD.R2hSUw8iC',NULL,'profile-1709010544798-900199403.webp','2024-02-28 22:19:59','2024-02-28 22:19:59');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28 19:26:15
