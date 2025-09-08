import '../js/components/card-component';

export default {
  title: 'Components/Card',
  component: 'card-component',
  render: () => '<card-component></card-component>',
};

export const Default = {};

export const WithNumber = {
  render: () => '<card-component>7</card-component>',
};