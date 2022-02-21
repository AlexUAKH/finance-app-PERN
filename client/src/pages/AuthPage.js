import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useInput } from "../utils/hooks";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { HOME_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router";

const AuthPage = observer(() => {
  const { t } = useTranslation();
  const { user, toast } = useContext(Context);

  const [formValid, setFormValid] = useState(false);
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  const mail = useInput("", { require: true, email: true });
  const password = useInput("", { require: true, minLength: 6 });

  useEffect(() => {
    if (mail.isValid && password.isValid) setFormValid(true);
    else setFormValid(false);
  }, [mail, password]);

  const submit = async type => {
    setPending(true);
    try {
      type === "reg"
        ? await user.registration(mail.value, password.value)
        : await user.login(mail.value, password.value);
      toast.setShow(true);
      toast.setToast("Registration successful");
      mail.reset();
      password.reset();
      navigate(HOME_ROUTE);
    } catch (e) {
      user.setError(e.response.data.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center h-100">
      <Card className="pt-4" style={{ width: "600px" }}>
        <h2 className="text-center">{t("app.login")}</h2>
        {user.userError && (
          <div className="text-danger ps-4">{user.userError}</div>
        )}
        <Card.Body>
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label>{t("login.mail")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={mail.value}
                onChange={e => {
                  mail.onChange(e.target.value);
                  user.setError("");
                }}
                onBlur={() => mail.onBlur()}
              />
              {mail.isDirty && (
                <Form.Text className="text-danger">
                  {mail.isEmpty && "Email cant be empty"}
                  {mail.lengthError ? mail.lengthError : ""}
                  {mail.emailError ? mail.emailError : ""}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("login.password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password.value}
                onChange={e => {
                  password.onChange(e.target.value);
                  user.setError("");
                }}
                onBlur={() => password.onBlur()}
              />
              {password.isDirty && (
                <Form.Text className="text-danger">
                  {password.isEmpty && "Password cant be empty"}
                  {password.lengthError ? password.lengthError : ""}
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-between">
              {/*{*/}
              {/*  user.isAuth && user.user.email === process.env.ADMIN_MAIL*/}
              {/*    ? */}
              <Button
                variant="success"
                disabled={!formValid && !pending}
                type="submit"
                className="px-4 me-3"
                onClick={() => submit("reg")}
              >
                {pending ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  t("login.registr")
                )}
              </Button>
              {/*    : null*/}
              {/*}*/}

              <Button
                variant="success"
                disabled={!formValid && !pending}
                type="submit"
                className="px-4 ms-auto"
                onClick={() => submit()}
              >
                {pending ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">submitting...</span>
                  </>
                ) : (
                  t("login.submit")
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default AuthPage;
