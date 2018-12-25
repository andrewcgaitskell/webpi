--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 10.5

-- Started on 2018-12-25 01:18:39 GMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16386)
-- Name: lights; Type: SCHEMA; Schema: -; Owner: pi
--

CREATE SCHEMA lights;


ALTER SCHEMA lights OWNER TO pi;

--
-- TOC entry 1 (class 3079 OID 12393)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2149 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 575 (class 2612 OID 16399)
-- Name: plpythonu; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: pi
--

CREATE OR REPLACE PROCEDURAL LANGUAGE plpythonu;


ALTER PROCEDURAL LANGUAGE plpythonu OWNER TO pi;

--
-- TOC entry 190 (class 1255 OID 16431)
-- Name: log_value_changes(); Type: FUNCTION; Schema: lights; Owner: pi
--

CREATE FUNCTION lights.log_value_changes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 IF NEW.value <> OLD.value THEN
 INSERT INTO lights.state_audit("id","characteristic","value_old","value_new","timestamp")
 VALUES(1,OLD.characteristic,OLD.value,NEW.value,now());
 END IF;
 
 RETURN NEW;
END;
$$;


ALTER FUNCTION lights.log_value_changes() OWNER TO pi;

--
-- TOC entry 191 (class 1255 OID 16450)
-- Name: notify_valuechange(); Type: FUNCTION; Schema: lights; Owner: pi
--

CREATE FUNCTION lights.notify_valuechange() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  PERFORM pg_notify(
    CAST('watchers' AS text),
    row_to_json(NEW)::text);
  RETURN NEW;
END;
$$;


ALTER FUNCTION lights.notify_valuechange() OWNER TO pi;

--
-- TOC entry 189 (class 1255 OID 16408)
-- Name: log_state_changes(); Type: FUNCTION; Schema: public; Owner: pi
--

CREATE FUNCTION public.log_state_changes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 IF NEW.state <> OLD.state THEN
 INSERT INTO state_audit(id,characteristic,value_old,value_new,timestamp)
 VALUES(1,characteristic,OLD.state,NEW.state,now());
 END IF;
 
 RETURN NEW;
END;
$$;


ALTER FUNCTION public.log_state_changes() OWNER TO pi;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 16400)
-- Name: numbers; Type: TABLE; Schema: lights; Owner: pi
--

CREATE TABLE lights.numbers (
    age integer
);


ALTER TABLE lights.numbers OWNER TO pi;

--
-- TOC entry 187 (class 1259 OID 16422)
-- Name: state; Type: TABLE; Schema: lights; Owner: pi
--

CREATE TABLE lights.state (
    id smallint NOT NULL,
    description text,
    device text,
    service text,
    characteristic text,
    value smallint,
    "timestamp" timestamp without time zone
);


ALTER TABLE lights.state OWNER TO pi;

--
-- TOC entry 188 (class 1259 OID 16441)
-- Name: state_audit; Type: TABLE; Schema: lights; Owner: pi
--

CREATE TABLE lights.state_audit (
    id integer NOT NULL,
    characteristic text,
    value_old integer,
    value_new integer,
    "timestamp" timestamp without time zone
);


ALTER TABLE lights.state_audit OWNER TO pi;

--
-- TOC entry 2139 (class 0 OID 16400)
-- Dependencies: 186
-- Data for Name: numbers; Type: TABLE DATA; Schema: lights; Owner: pi
--

COPY lights.numbers (age) FROM stdin;
632
732
\.


--
-- TOC entry 2140 (class 0 OID 16422)
-- Dependencies: 187
-- Data for Name: state; Type: TABLE DATA; Schema: lights; Owner: pi
--

COPY lights.state (id, description, device, service, characteristic, value, "timestamp") FROM stdin;
3	House	1234	1234	1234	0	2018-12-24 16:11:32.693045
2	House	1234	1234	1234	1	2018-12-24 16:08:36.173644
4	House	1234	1234	1234	9	2018-12-24 16:12:47.160796
1	House	1234	1234	1234	10	2018-12-24 16:08:30.521879
\.


--
-- TOC entry 2141 (class 0 OID 16441)
-- Dependencies: 188
-- Data for Name: state_audit; Type: TABLE DATA; Schema: lights; Owner: pi
--

COPY lights.state_audit (id, characteristic, value_old, value_new, "timestamp") FROM stdin;
1	1234	2	0	2018-12-24 16:13:09.418556
1	1234	0	1	2018-12-24 16:13:14.795075
1	1234	0	1	2018-12-24 16:16:25.069795
1	1234	0	4	2018-12-24 16:28:42.272425
1	1234	4	5	2018-12-24 16:56:44.570823
1	1234	5	7	2018-12-24 18:58:23.597735
1	1234	7	8	2018-12-24 18:58:47.256031
1	1234	8	9	2018-12-24 19:04:34.498876
1	1234	1	10	2018-12-24 19:06:41.291367
\.


--
-- TOC entry 2019 (class 2606 OID 16429)
-- Name: state state_pkey; Type: CONSTRAINT; Schema: lights; Owner: pi
--

ALTER TABLE ONLY lights.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (id);


--
-- TOC entry 2021 (class 2620 OID 16451)
-- Name: state_audit notify_valuechange; Type: TRIGGER; Schema: lights; Owner: pi
--

CREATE TRIGGER notify_valuechange AFTER INSERT ON lights.state_audit FOR EACH ROW EXECUTE PROCEDURE lights.notify_valuechange();


--
-- TOC entry 2020 (class 2620 OID 16432)
-- Name: state value_changes; Type: TRIGGER; Schema: lights; Owner: pi
--

CREATE TRIGGER value_changes BEFORE UPDATE ON lights.state FOR EACH ROW EXECUTE PROCEDURE lights.log_value_changes();


-- Completed on 2018-12-25 01:18:41 GMT

--
-- PostgreSQL database dump complete
--

