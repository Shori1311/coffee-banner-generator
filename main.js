const get = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const init = async () => {
  const coffees = {
    hot: [],
    iced: [],
  };

  coffees.hot = await get("https://api.sampleapis.com/coffee/hot");
  coffees.iced = await get("https://api.sampleapis.com/coffee/iced");

  const variantInputSelect = document.getElementById("coffee-variant");
  const typeInputRadioHot = document.getElementById("type-hot");
  const typeInputRadioIced = document.getElementById("type-iced");
  const stepOneButton = document.getElementById("step_one");

  generateVariantOptions(coffees.hot, variantInputSelect);

  typeInputRadioHot.addEventListener("change", () =>
    generateVariantOptions(coffees.hot, variantInputSelect)
  );
  typeInputRadioIced.addEventListener("change", () =>
    generateVariantOptions(coffees.iced, variantInputSelect)
  );
  variantInputSelect.addEventListener("change", () => {
    stepOneButton.disabled = false;
    const selectedValue = variantInputSelect.value;
    if (selectedValue) {
      // Generate live preview based on the selected variant
      generatePreviewItem(JSON.parse(selectedValue));
    }
  });

  stepOneButton.addEventListener("click", onStepOneCompleted);

  const radioButtonsWidth = document.querySelectorAll(
    'input[name="banner-width"]'
  );

  radioButtonsWidth.forEach((radio) => {
    radio.addEventListener("change", () => {
      onWidthChanged(radio.value);
    });
  });
  document
    .getElementById("banner-width-custom-number")
    .addEventListener("input", () => {
      if (document.getElementById("banner-width-custom").checked) {
        document.getElementById("step_two").disabled = false;
      }
    });
};

const generateVariantOptions = (items, element) => {
  element.innerHTML = `<option disabled selected>Select</option>`;

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(item);
    option.text = item.title;
    element.appendChild(option);
  });

  const button = document.getElementById("step_one");
  button.disabled = true;
};

const onStepOneCompleted = () => {
  const variantInputSelect = document.getElementById("coffee-variant");
  generatePreviewItem(JSON.parse(variantInputSelect.value));
};

const generatePreviewItem = (item) => {
  const previewZone = document.getElementById("preview");
  const template = `<div>${item["title"]}</div>`;
  previewZone.innerHTML = template;
};

const onWidthChanged = (value) => {
  let width = value;

  if (value === "custom") {
    const customInput = document.getElementById("banner-width-custom-number");
    width = `${customInput.value}px`;
  }

  const secondStepButton = document.getElementById("step_two");
  secondStepButton.disabled = false;
};

init();
