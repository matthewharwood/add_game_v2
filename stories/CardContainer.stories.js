import '../js/components/card-container-component';
import '../js/components/card-slot-component';
import '../js/components/card-component';

export default {
  title: 'Components/CardContainer',
  component: 'card-container-component',
  render: () => '<card-container-component></card-container-component>',
};

export const Default = {};

export const WithCardSlots = {
  render: () => `
    <card-container-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
    </card-container-component>
  `,
};

export const WithCardSlotAndCard = {
  render: () => `
    <card-container-component>
      <card-slot-component>
        <card-component>1</card-component>
      </card-slot-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
      <card-slot-component></card-slot-component>
    </card-container-component>
  `,
};

export const WithCardSlotAndDraggableCards = {
  render: () => `
    <card-container-component>
      <card-slot-component>
        <card-component>1</card-component>
      </card-slot-component>
      <card-slot-component>
        <card-component>2</card-component>
      </card-slot-component>
      <card-slot-component>
        <card-component>3</card-component>
      </card-slot-component>
      <card-slot-component>
        <card-component>4</card-component>
      </card-slot-component>
      <card-slot-component>
        <card-component>5</card-component>
      </card-slot-component>
    </card-container-component>
  `,
};