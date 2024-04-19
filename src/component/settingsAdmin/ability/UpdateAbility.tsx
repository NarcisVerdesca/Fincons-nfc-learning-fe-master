import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AbilityService from "../../../services/AbilityService";
import Ability from "../../../models/AbilityModel";

const UpdateAbility = () => {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [selectedAbilityId, setSelectedAbilityId] = useState<number | null>(null);
  const [ability, setAbility] = useState<Ability>();
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [updatedAbility, setUpdatedAbility] = useState<any>();
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);

  const navigate = useNavigate();

  const refreshList = () => {
    AbilityService.getAbilities().then((res) => {
      setAbilities(res.data);
    });
  }

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    if (selectedAbilityId !== null) {
      AbilityService.getAbilityById(selectedAbilityId).then((res) => {
        setAbility(res.data);
      });
    }
  }, [selectedAbilityId]);

  useEffect(() => {
    console.log("Use effect updated ability:" + updatedAbility);

    if (updatedAbility && isCallComplete) {
      if (updatedAbility.status === 200) {
        setUpdatedSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (updatedAbility.status === 409) {
        setUpdatedSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [updatedAbility, isCallComplete]);


  const UpdateAbility = async () => {
    if (nameError) {
      return;
    }

    try {
      setLoading(true);
      const tempUpdatedAbility = await AbilityService.updateAbility(selectedAbilityId!, ability!);
      setUpdatedAbility(tempUpdatedAbility);
      console.log("Updated ability: " + tempUpdatedAbility)
      setIsCallComplete(true);
      refreshList();
    } catch (error: any) {
      setUpdatedAbility(error.response);
      setIsCallComplete(true);
      refreshList();
    } finally {
      setLoading(false);
    }
  };

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
      setErrorMessage("Name mustbe between 1 and 255 characters");
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
        <h3 className="titleModal">Update Ability</h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Ability</label>
              <select
                name="ability"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedAbilityId(Number(e.target.value));
                }}
              >
                <option selected>Select the Ability to update</option>
                {abilities.map((ability) => {
                  return (
                    <option key={ability.id} value={ability.id}>
                      {ability.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {ability && (
              <>
                <div>
                  <label className="labelModal">Name</label>
                  <input
                    type="string"
                    placeholder={ability.name}
                    name="name"
                    className={`form-control ${nameError ? "border-red-500" : ""
                      }`}
                    value={ability.name}
                    onChange={(e) =>
                      handleInputChange(e, setNameError, setNameErrorMessage)
                    }
                  ></input>
                  {nameErrorMessage && (
                    <p className="text-muted">{nameErrorMessage}</p>
                  )}
                </div>

                {loading && <div>Saving in progress...</div>}

                {!loading && updatedSuccessfully && (
                  <div>
                    <label className="labelModal">Ability updated correctly!</label>
                  </div>
                )}

                {!loading && !updatedSuccessfully && resourceAlreadyExists && (
                  <div>
                    <label className="labelModal">The ability already exists!</label>
                  </div>
                )}



                <div className="containerButtonModal">
                  <button
                    className="buttonCheck"
                    onClick={UpdateAbility}
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
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateAbility;
