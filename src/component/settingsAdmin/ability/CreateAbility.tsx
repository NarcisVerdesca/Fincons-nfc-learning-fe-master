import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AbilityService from "../../../services/AbilityService";
import Ability from "../../../models/AbilityModel";

const CreateAbility = () => {
  const [ability, setAbility] = useState<Ability>();
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [savedAbility, setSavedAbility] = useState<any>();

  const navigate = useNavigate();

  const saveAbility = async () => {
    if (nameError) {
      return;
    }

    try {
      setLoading(true);
      const tempSavedAbility = await AbilityService.createAbility(ability!);
      setSavedAbility(tempSavedAbility);
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedAbility(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (savedAbility && isCallComplete) {
      if (savedAbility.status === 200) {
        setSaveSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (savedAbility.status === 409) {
        setSaveSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [savedAbility, isCallComplete]);

  const backToSettings = () => {
    navigate("/settings_admin");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = event.target;
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    if (name === "name" && (inputLength < 1 || inputLength > 255)) {
      setError(true);
      setErrorMessage("Name must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setAbility({
      ...ability!,
      [name]: inputValue,
    });
  };

  return (
    <div>
      <div>
        <h3 className="titleModal">Create Ability</h3>
        <div>
          <form>
            <div>
              <label className="labelModal">Name</label>
              <input
                type="string"
                placeholder="Name"
                name="name"
                className={`form-control ${nameError ? "border-red-500" : ""}`}
                value={ability?.name}
                onChange={(e) =>
                  handleInputChange(e, setNameError, setNameErrorMessage)
                }
              ></input>
              {nameErrorMessage && (
                <p className="text-muted">{nameErrorMessage}</p>
              )}
            </div>
            {loading &&
              <div>
                <label className="labelModal">Saving in progress...</label>
              </div>}

            {!loading && savedSuccessfully && (
              <div>
                <label className="labelModal">Ability saved correctly!</label>
              </div>
            )}

            {!loading && !savedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The ability already exists!</label>
              </div>
            )}



            <div className="containerButtonModal">
              <button
                className="buttonCheck"
                onClick={saveAbility}
                disabled={nameError}
                type="button"
              >
                <span className="frontCheck">
                  <i className="bi bi-check2"></i>
                </span>
              </button>
              <button className="buttonReturn" onClick={backToSettings}>
                <span className="frontReturn">
                  <i className="bi bi-arrow-left"></i>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAbility;
