import { Button, Layout, Modal, Row } from "antd";
import { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout>
			<div>{JSON.stringify(events)}</div>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
      </Row>
      <Modal
        onCancel={() => setModalVisible(false)}
        title="Добавить событие"
        visible={modalVisible}
        footer={null}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
