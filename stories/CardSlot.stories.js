import '../js/components/card-slot-component';
import '../js/components/card-component';

export default {
  title: 'Components/CardSlot',
  component: 'card-slot-component',
  render: () => '<card-slot-component></card-slot-component>',
};

export const Default = {};

export const WithContent = {
  render: () => '<card-slot-component><card-component>5</card-component></card-slot-component>',
};