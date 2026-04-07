import { render, screen, fireEvent } from '@testing-library/react';
import Settings from './Settings';

beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
});

test('shows modal when add station button clicked', () => {
  render(
    <Settings
      selectedStations={[]}
      removeStation={() => {}}
      onStationEdit={() => {}}
      onStationSelect={() => {}}
      onLanguageChange={() => {}}
      onRemarksVisibilityChange={() => {}}
      onStandardRemarksVisibilityChange={() => {}}
      onAutoHideChange={() => {}}
      settingsClass=""
      remarksVisibility={false}
      standardRemarksVisibility={false}
      language="en"
      autoHideEnabled={false}
    />
  );

  fireEvent.click(screen.getByText('Add station'));
  expect(screen.getByText('Please provide the name of a station:')).toBeTruthy();
});

test('keeps the general settings card body contained within the card', () => {
  const { container } = render(
    <Settings
      selectedStations={[]}
      removeStation={() => {}}
      onStationEdit={() => {}}
      onStationSelect={() => {}}
      onLanguageChange={() => {}}
      onRemarksVisibilityChange={() => {}}
      onStandardRemarksVisibilityChange={() => {}}
      onAutoHideChange={() => {}}
      onHideDepartureColChange={() => {}}
      onResetCookieConsent={() => {}}
      settingsClass=""
      remarksVisibility={false}
      standardRemarksVisibility={false}
      hideDepartureCol={false}
      language="en"
      autoHideEnabled={false}
    />
  );

  // The card container has no semantic role, so direct DOM lookup is the least brittle option here.
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const card = container.querySelector('.general-settings-card');
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const cardBody = container.querySelector('.general-settings-card .ant-card-body');

  expect(card).toBeTruthy();
  expect(cardBody).toBeTruthy();
});
