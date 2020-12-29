import PatchEvent, {
  set,
  unset,
} from 'part:@sanity/form-builder/patch-event'
import React from 'react'

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(value))
}

const formatPhoneNumber = value => {}

export default function PhoneNumberInput({
  type,
  value,
  onChange,
  inputComponent,
}) {
  return (
    <div>
      <p>{type.title}</p>
      <p>
        {formatPhoneNumber(value)} {value}
      </p>
      <input
        type={type.name}
        value={value}
        onChange={e => onChange(createPatchFrom(e.target.value))}
        ref={inputComponent}
      />
    </div>
  )
}

PhoneNumberInput.focus = function () {
  this._inputElement.focus()
}

// ^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$
