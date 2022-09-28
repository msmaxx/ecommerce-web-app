--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16440)
-- Name: cartItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."cartItems" (
    id integer NOT NULL,
    price double precision,
    amount integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "cartId" integer,
    "itemId" integer
);


ALTER TABLE public."cartItems" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16439)
-- Name: cartItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."cartItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."cartItems_id_seq" OWNER TO postgres;

--
-- TOC entry 3653 (class 0 OID 0)
-- Dependencies: 217
-- Name: cartItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."cartItems_id_seq" OWNED BY public."cartItems".id;


--
-- TOC entry 212 (class 1259 OID 16400)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16399)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 3654 (class 0 OID 0)
-- Dependencies: 211
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 214 (class 1259 OID 16412)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16411)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3655 (class 0 OID 0)
-- Dependencies: 213
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 216 (class 1259 OID 16425)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price double precision NOT NULL,
    image character varying(255) NOT NULL,
    description character varying(255),
    quantity character varying(255),
    active character varying(255) DEFAULT 'TRUE'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "categoryId" integer
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16424)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 215
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 222 (class 1259 OID 16466)
-- Name: orderItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."orderItems" (
    id integer NOT NULL,
    price double precision NOT NULL,
    amount integer NOT NULL,
    "itemId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orderId" integer
);


ALTER TABLE public."orderItems" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16465)
-- Name: orderItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."orderItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."orderItems_id_seq" OWNER TO postgres;

--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 221
-- Name: orderItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."orderItems_id_seq" OWNED BY public."orderItems".id;


--
-- TOC entry 220 (class 1259 OID 16457)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "paymentMethod" character varying(255) NOT NULL,
    "paymentStatus" character varying(255) NOT NULL,
    "totalPrice" double precision NOT NULL,
    comment character varying(255),
    status character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16456)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3658 (class 0 OID 0)
-- Dependencies: 219
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 210 (class 1259 OID 16388)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16387)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3659 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3467 (class 2604 OID 16443)
-- Name: cartItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN id SET DEFAULT nextval('public."cartItems_id_seq"'::regclass);


--
-- TOC entry 3463 (class 2604 OID 16403)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 3464 (class 2604 OID 16415)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3465 (class 2604 OID 16428)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 3469 (class 2604 OID 16469)
-- Name: orderItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderItems" ALTER COLUMN id SET DEFAULT nextval('public."orderItems_id_seq"'::regclass);


--
-- TOC entry 3468 (class 2604 OID 16460)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3461 (class 2604 OID 16391)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3643 (class 0 OID 16440)
-- Dependencies: 218
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3637 (class 0 OID 16400)
-- Dependencies: 212
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.carts (id, "createdAt", "updatedAt", "userId") VALUES (1, '2022-09-24 16:44:53.098+03', '2022-09-24 16:44:53.098+03', 1);


--
-- TOC entry 3639 (class 0 OID 16412)
-- Dependencies: 214
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name, slug, "createdAt", "updatedAt") VALUES (1, 'Food', 'food', '2022-09-26 13:30:43.144+03', '2022-09-26 13:30:43.144+03');
INSERT INTO public.categories (id, name, slug, "createdAt", "updatedAt") VALUES (2, 'Toys & Clothes', 'toys-clothes', '2022-09-26 13:31:54.848+03', '2022-09-26 13:31:54.848+03');


--
-- TOC entry 3641 (class 0 OID 16425)
-- Dependencies: 216
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (5, 'Apple tart', 1.5, '26f8fd34-74a6-441c-8463-ae454802d2a7.jpg', 'Apple tart', '60', 'TRUE', '2022-09-26 16:43:43.615+03', '2022-09-26 16:43:43.615+03', 1);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (7, 'Water', 1.5, '203ac014-3020-466f-a46d-e5adffddea60.jpg', 'Water', '30', 'TRUE', '2022-09-26 16:48:51.504+03', '2022-09-26 16:48:51.504+03', 1);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (11, 'Toy', 1, '3246e26c-1d95-4efb-a6b9-6292ce477c53.jpg', 'Toy', '0', 'TRUE', '2022-09-26 17:14:00.854+03', '2022-09-26 17:14:00.854+03', 2);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (1, 'Brownie', 0.65, 'f1d7c5ea-1191-4748-aa85-5d87938ba4fc.jpg', 'Brownie', '48', 'TRUE', '2022-09-26 15:44:49.85+03', '2022-09-26 15:44:49.85+03', 1);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (2, 'Muffin', 1, '746c958a-6d1a-4ccd-88b5-871e1388be23.jpg', 'Muffin', '36', 'TRUE', '2022-09-26 16:35:53.946+03', '2022-09-28 16:50:46.837+03', 1);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (3, 'Cake Pop', 1.35, 'a3470b19-b78d-4bd2-a020-379850658a5b.jpg', 'Cake Pop', '24', 'TRUE', '2022-09-26 16:38:57.234+03', '2022-09-28 16:52:19.402+03', 1);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (9, 'Pants', 3, 'b3546550-5c73-4fb9-82a0-79a5766e98a4.jpg', 'Pants', '0', 'TRUE', '2022-09-26 17:09:21.793+03', '2022-09-28 17:24:13.384+03', 2);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (10, 'Jacket', 4, '208204ff-6b7a-4d68-8ca7-7ea87843b6d7.jpg', 'Jacket', '3', 'TRUE', '2022-09-26 17:11:51.07+03', '2022-09-28 17:26:07.218+03', 2);
INSERT INTO public.items (id, name, price, image, description, quantity, active, "createdAt", "updatedAt", "categoryId") VALUES (8, 'Shirt', 2, '70b4b2b7-b5d9-4919-b574-2beb045b00cf.jpg', 'Shirt', '3', 'TRUE', '2022-09-26 17:02:07.725+03', '2022-09-29 01:59:35.48+03', 2);


--
-- TOC entry 3647 (class 0 OID 16466)
-- Dependencies: 222
-- Data for Name: orderItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (20, 1.5, 1, 5, 1, '2022-09-28 15:32:51.039+03', '2022-09-28 15:32:51.039+03', 13);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (21, 1.5, 1, 5, 1, '2022-09-28 15:34:02.329+03', '2022-09-28 15:34:02.329+03', 14);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (22, 1.35, 1, 3, 1, '2022-09-28 15:34:02.341+03', '2022-09-28 15:34:02.341+03', 14);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (23, 1, 1, 2, 1, '2022-09-28 15:34:02.35+03', '2022-09-28 15:34:02.35+03', 14);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (24, 1, 1, 2, 1, '2022-09-28 15:35:29.893+03', '2022-09-28 15:35:29.893+03', 15);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (25, 1.5, 1, 5, 1, '2022-09-28 15:35:29.904+03', '2022-09-28 15:35:29.904+03', 15);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (26, 1.35, 1, 3, 1, '2022-09-28 15:35:29.909+03', '2022-09-28 15:35:29.909+03', 15);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (27, 0.65, 1, 1, 1, '2022-09-28 15:35:29.918+03', '2022-09-28 15:35:29.918+03', 15);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (28, 1.5, 1, 7, 1, '2022-09-28 15:35:29.923+03', '2022-09-28 15:35:29.923+03', 15);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (29, 1.5, 1, 5, 1, '2022-09-28 17:16:30.268+03', '2022-09-28 17:16:30.268+03', 16);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (30, 1.5, 1, 7, 1, '2022-09-28 17:16:30.278+03', '2022-09-28 17:16:30.278+03', 16);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (31, 0.65, 1, 1, 1, '2022-09-28 17:16:30.286+03', '2022-09-28 17:16:30.286+03', 16);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (32, 1.35, 1, 3, 1, '2022-09-28 17:16:30.293+03', '2022-09-28 17:16:30.293+03', 16);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (33, 1, 1, 2, 1, '2022-09-28 17:16:30.301+03', '2022-09-28 17:16:30.301+03', 16);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (34, 1.5, 1, 5, 1, '2022-09-28 17:19:58.41+03', '2022-09-28 17:19:58.41+03', 17);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (35, 1.5, 1, 7, 1, '2022-09-28 17:19:58.426+03', '2022-09-28 17:19:58.426+03', 17);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (36, 0.65, 1, 1, 1, '2022-09-28 17:19:58.433+03', '2022-09-28 17:19:58.433+03', 17);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (37, 1.35, 1, 3, 1, '2022-09-28 17:19:58.446+03', '2022-09-28 17:19:58.446+03', 17);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (38, 1, 1, 2, 1, '2022-09-28 17:19:58.459+03', '2022-09-28 17:19:58.459+03', 17);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (39, 4, 1, 10, 1, '2022-09-28 17:26:45.172+03', '2022-09-28 17:26:45.172+03', 18);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (40, 1.35, 1, 3, 1, '2022-09-28 17:26:45.187+03', '2022-09-28 17:26:45.187+03', 18);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (41, 1, 1, 2, 1, '2022-09-28 17:26:45.202+03', '2022-09-28 17:26:45.202+03', 18);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (42, 1.5, 1, 7, 1, '2022-09-28 17:26:45.218+03', '2022-09-28 17:26:45.218+03', 18);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (43, 1.5, 1, 5, 1, '2022-09-28 17:26:45.232+03', '2022-09-28 17:26:45.232+03', 18);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (44, 1.5, 1, 5, 1, '2022-09-29 01:38:42.871+03', '2022-09-29 01:38:42.871+03', 19);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (45, 1.5, 1, 7, 1, '2022-09-29 01:38:42.915+03', '2022-09-29 01:38:42.915+03', 19);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (46, 1, 1, 2, 1, '2022-09-29 01:38:42.987+03', '2022-09-29 01:38:42.987+03', 19);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (47, 0.65, 1, 1, 1, '2022-09-29 01:38:43.035+03', '2022-09-29 01:38:43.035+03', 19);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (48, 4, 1, 10, 1, '2022-09-29 01:38:43.082+03', '2022-09-29 01:38:43.082+03', 19);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (49, 1.5, 1, 5, 1, '2022-09-29 02:00:24.787+03', '2022-09-29 02:00:24.787+03', 20);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (50, 1.5, 1, 7, 1, '2022-09-29 02:00:24.799+03', '2022-09-29 02:00:24.799+03', 20);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (51, 0.65, 1, 1, 1, '2022-09-29 02:00:24.805+03', '2022-09-29 02:00:24.805+03', 20);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (52, 1, 1, 2, 1, '2022-09-29 02:00:24.812+03', '2022-09-29 02:00:24.812+03', 20);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (53, 2, 1, 8, 1, '2022-09-29 02:00:24.819+03', '2022-09-29 02:00:24.819+03', 20);
INSERT INTO public."orderItems" (id, price, amount, "itemId", "userId", "createdAt", "updatedAt", "orderId") VALUES (54, 4, 1, 10, 1, '2022-09-29 02:00:24.824+03', '2022-09-29 02:00:24.824+03', 20);


--
-- TOC entry 3645 (class 0 OID 16457)
-- Dependencies: 220
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (13, 'cash', 'change', 3.85, 'client cash: 5 / change: 1.15', 'COMPLETED', 1, '2022-09-28 15:32:50.909+03', '2022-09-28 15:32:50.909+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (14, 'cash', 'exactAmount', 3.85, '0.00', 'COMPLETED', 1, '2022-09-28 15:34:02.313+03', '2022-09-28 15:34:02.313+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (15, 'cash', 'change', 6, 'client cash: 10 / change: 4.00', 'COMPLETED', 1, '2022-09-28 15:35:29.88+03', '2022-09-28 15:35:29.88+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (16, 'cash', 'change', 6, 'client cash: 015 / change: 9.00', 'COMPLETED', 1, '2022-09-28 17:16:30.236+03', '2022-09-28 17:16:30.236+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (17, 'cash', 'change', 6, 'client cash: 17 / change: 11.00', 'COMPLETED', 1, '2022-09-28 17:19:58.375+03', '2022-09-28 17:19:58.375+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (18, 'cash', 'change', 9.35, 'client cash: 20 / change: 10.65', 'COMPLETED', 1, '2022-09-28 17:26:45.136+03', '2022-09-28 17:26:45.136+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (19, 'cash', 'change', 8.65, 'client cash: 15 / change: 6.35', 'COMPLETED', 1, '2022-09-29 01:38:42.774+03', '2022-09-29 01:38:42.774+03');
INSERT INTO public.orders (id, "paymentMethod", "paymentStatus", "totalPrice", comment, status, "userId", "createdAt", "updatedAt") VALUES (20, 'cash', 'change', 10.65, 'client cash: 20 / change: 9.35', 'COMPLETED', 1, '2022-09-29 02:00:24.761+03', '2022-09-29 02:00:24.761+03');


--
-- TOC entry 3635 (class 0 OID 16388)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, email, password, role, "createdAt", "updatedAt") VALUES (1, 'Maksim', 'maksim@mail.com', '$2b$05$Gg9CA5Zrl667zSAReI3H6O0vcTkE1s7x7ZjbhT18Rlp2ZHBLJMaiG', 'ADMIN', '2022-09-24 16:44:53.074+03', '2022-09-24 16:44:53.074+03');


--
-- TOC entry 3660 (class 0 OID 0)
-- Dependencies: 217
-- Name: cartItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."cartItems_id_seq"', 225, true);


--
-- TOC entry 3661 (class 0 OID 0)
-- Dependencies: 211
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, true);


--
-- TOC entry 3662 (class 0 OID 0)
-- Dependencies: 213
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- TOC entry 3663 (class 0 OID 0)
-- Dependencies: 215
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 11, true);


--
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 221
-- Name: orderItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."orderItems_id_seq"', 54, true);


--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 219
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 20, true);


--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 3485 (class 2606 OID 16445)
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 16405)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 3477 (class 2606 OID 16421)
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- TOC entry 3479 (class 2606 OID 16419)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 16423)
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- TOC entry 3483 (class 2606 OID 16433)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 3489 (class 2606 OID 16471)
-- Name: orderItems orderItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderItems"
    ADD CONSTRAINT "orderItems_pkey" PRIMARY KEY (id);


--
-- TOC entry 3487 (class 2606 OID 16464)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3471 (class 2606 OID 16398)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3473 (class 2606 OID 16396)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3492 (class 2606 OID 16446)
-- Name: cartItems cartItems_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3493 (class 2606 OID 16451)
-- Name: cartItems cartItems_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3490 (class 2606 OID 16406)
-- Name: carts carts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3491 (class 2606 OID 16434)
-- Name: items items_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3494 (class 2606 OID 16472)
-- Name: orderItems orderItems_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderItems"
    ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;
