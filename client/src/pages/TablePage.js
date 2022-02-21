import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Button,
  Stack,
  Table,
  OverlayTrigger,
  Tooltip,
  Badge
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SearchBar from "../components/SearchBar";
import moment from "moment";
import RecordModal from "../components/modals/RecordModal";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import LoaderOverley from "../components/LoaderOverley";
import DeleteConfirm from "../components/modals/DeleteConfirm";

const TablePage = observer(() => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [entry, setEntry] = useState({});
  const [showDelConfirm, setShowDelConfirm] = useState(false);
  const { user, record, toast } = useContext(Context);

  useEffect(() => {
    const fetchTab = async () => {
      try {
        setLoading(true);
        await record.fetchRecords();
      } catch (e) {
        console.log("table err: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchTab();
  }, []);

  const dateFormat = mills => {
    return moment(mills).format("DD.MM.YY");
  };

  const handleRecord = rec => {
    if (user.isAuth) {
      if (rec) setEntry({ ...rec });
      else setEntry(null);
      setShowModal(true);
    } else return null;
  };

  const saveHandler = async rec => {
    setLoading(true);
    record.setError(null);
    try {
      if (rec.description === "") rec.description = "offering";
      const newFlag = !entry;
      await record.save(
        {
          ...rec,
          userId: user.user.id,
          userName: user.user.name
        },
        newFlag
      );
      toast.setToast("Saved successfuly");
    } catch (e) {
      toast.setToast(e.message, "error");
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const deleteHandler = () => {
    setShowModal(false);
    setShowDelConfirm(true);
  };

  const confirmHandler = async bool => {
    setShowDelConfirm(false);
    record.setError(null);
    if (bool) {
      setLoading(true);
      try {
        await record.delete(entry.id);
        toast.setToast("Delete successfuly");
      } catch (e) {
        toast.setToast(e.message, "error");
      } finally {
        setLoading(false);
        setShowModal(false);
      }
    }
  };

  const cls = ["mt-4", user.isAuth ? "admin" : ""].join(" ");

  return (
    <Container className="mt-3">
      {loading && <LoaderOverley />}
      <Stack direction="horizontal" gap={3}>
        <SearchBar className="me-auto" />
        {user.isAuth && (
          <Button className="text-nowrap" onClick={() => handleRecord(null)}>
            {t("table.add-record")}
          </Button>
        )}
      </Stack>

      {record.error && (
        <div className="text-danger mt-3 ms-3">{record.error}</div>
      )}

      <Table striped bordered hover className={cls}>
        <thead>
          <tr className="text-center">
            <th>Date</th>
            <th>Description</th>
            <th>uah</th>
            <th>usd</th>
            <th>euro</th>
            <th>athor</th>
          </tr>
        </thead>

        <tbody>
          {record.records.length === 0 && (
            <tr>
              <td colSpan="6">
                <h2>No data to show</h2>
              </td>
            </tr>
          )}
          {record.records.length > 0 &&
            record.records.map(tr => (
              <tr key={tr.id} onClick={() => handleRecord(tr)}>
                <td>{dateFormat(tr.date)}</td>
                <td className={tr.type === "DEC" ? "text-danger" : null}>
                  {tr.description}
                </td>
                <td>{tr.uah}</td>
                <td>{tr.usd}</td>
                <td>{tr.euro}</td>
                <td style={{ maxWidth: "50px" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{tr.userName}</Tooltip>}
                  >
                    {/*<div className="rounded-circle bg-dark px-md-2 fs-6 text-white">*/}
                    {/*  { tr.userName.split("").slice(0, 2).join("").toUpperCase() }*/}
                    {/*</div>*/}
                    <Badge pill bg="dark">
                      {tr.userName.split("").slice(0, 2).join("").toUpperCase()}
                    </Badge>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <RecordModal
        show={showModal}
        onHide={() => setShowModal(false)}
        record={entry}
        onSave={saveHandler}
        onDelete={deleteHandler}
      />
      <DeleteConfirm show={showDelConfirm} confirm={confirmHandler} />
    </Container>
  );
});

export default TablePage;
